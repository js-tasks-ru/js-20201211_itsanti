export default class ColumnChart {
  chartHeight = 50;

  constructor({
    data= [],
    label = '',
    link = '',
    value =  0
  } = {}) {
    this.data = data;
    this.label = label;
    this.link = link;
    this.value = value;

    this.render();
  }

  getChartColumns(data) {
    const maxValue = Math.max(...data);
    const scale = this.chartHeight / maxValue;
    return data
      .map(item => {
        const percent = (item / maxValue * 100).toFixed(0);
        return `<div style="--value: ${Math.floor(item * scale)}" data-tooltip="${percent}%"></div>`;
      })
      .join('');
  }

  update(data) {
    this.element.querySelector('[data-element="body"]').innerHTML = this.getChartColumns(data);
  }

  renderLink() {
    return this.link ? `<a class="column-chart__link" href="${this.link}">View all</a>` : '';
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = `
      <div class="column-chart column-chart_loading" style="--chart-height: ${this.chartHeight}">
        <div class="column-chart__title">
          Total ${this.label}
          ${this.renderLink()}
        </div>
        <div class="column-chart__container">
          <div data-element="header" class="column-chart__header">
            ${this.value}
          </div>
          <div data-element="body" class="column-chart__chart">
            ${this.getChartColumns(this.data)}
          </div>
        </div>
      </div>
    `;

    this.element = element.firstElementChild;

    if (this.data.length) {
      this.element.classList.remove('column-chart_loading');
    }
  }

  remove () {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.element = null;
  }
}
