type EventHandler<T = unknown> = (payload: T) => void;

export class EventBus {
  private listeners = new Map<string, Set<EventHandler>>();

  public on<T>(event: string, handler: EventHandler<T>): void {
    const handlers = this.listeners.get(event);

    if (handlers) {
      handlers.add(handler as EventHandler);
      return;
    }

    this.listeners.set(
      event,
      new Set<EventHandler>([handler as EventHandler]),
    );
  }

  public off<T>(event: string, handler: EventHandler<T>): void {
    const handlers = this.listeners.get(event);

    if (!handlers) {
      return;
    }

    handlers.delete(handler as EventHandler);

    if (handlers.size === 0) {
      this.listeners.delete(event);
    }
  }

  public emit<T>(event: string, payload: T): void {
    const handlers = this.listeners.get(event);

    if (!handlers) {
      return;
    }

    handlers.forEach((handler) => {
      handler(payload);
    });
  }

  public clear(): void {
    this.listeners.clear();
  }
}