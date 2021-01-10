export default class NotificationMessage {
  static activeNotification;

  constructor(msg, {
    duration = 2000,
    type = 'success',
  } = {}) {

    this.msg = msg;
    this.duration = duration;
    this.durationInSeconds = duration / 1000;
    this.type = type;

    this.render();
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.template;
    this.element = element.firstElementChild;

    if (NotificationMessage.activeNotification) {
      NotificationMessage.activeNotification.remove();
    }
    NotificationMessage.activeNotification = this.element;
  }

  get template() {
    return `
      <div class="notification ${this.type}" style="--value:${this.durationInSeconds}s">
        <div class="timer"></div>
        <div class="inner-wrapper">
          <div class="notification-header">
            Notification
          </div>
          <div class="notification-body">
            ${this.msg}
          </div>
        </div>
      </div>
    `;
  }

  show(parent = document.body) {
    parent.append(this.element);

    setTimeout(() => {
      this.remove();
    }, this.duration);
  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    NotificationMessage.activeNotification = null;
  }
}
