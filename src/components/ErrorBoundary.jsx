import { Component } from "react";

/**
 * Error Boundary global. Captura cualquier error de render no controlado
 * y muestra una pantalla de recuperación en lugar de dejar la app en blanco.
 *
 * En producción, aquí iría la integración con un servicio de monitoring
 * (Sentry, Datadog, Bugsnag...). De momento loguea por consola.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    // TODO: reportar a servicio de error tracking cuando esté configurado.
    if (process.env.NODE_ENV !== "production") {
      // eslint-disable-next-line no-console
      console.error("ErrorBoundary capturó un error:", error, errorInfo);
    }
  }

  handleReload = () => {
    this.setState({ hasError: false, error: null });
    window.location.reload();
  };

  handleHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-white px-6">
          <div className="max-w-md w-full text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-red-500 mb-3">
              Error inesperado
            </span>
            <h1 className="text-3xl md:text-4xl font-bold text-dark leading-tight mb-4">
              Algo ha ido mal.
            </h1>
            <p className="text-sm text-gray-500 leading-relaxed mb-8">
              Hemos registrado el error. Prueba a recargar la página o vuelve
              al inicio. Si el problema persiste, contacta con soporte.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button
                onClick={this.handleReload}
                className="bg-dark text-white px-6 py-3 rounded-xl hover:bg-primary transition-colors font-semibold text-sm"
              >
                Recargar
              </button>
              <button
                onClick={this.handleHome}
                className="text-dark border border-gray-300 px-6 py-3 rounded-xl hover:border-dark hover:bg-gray-50 transition-colors font-semibold text-sm"
              >
                Ir al inicio
              </button>
            </div>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}
