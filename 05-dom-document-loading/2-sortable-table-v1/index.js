export default class SortableTable {
  subElements = {};

  constructor(header, {data}) {
    this.header = header;
    this.data = data;

    this.render();
  }

  get tableHeader() {
    return `<div data-element="header" class="sortable-table__header sortable-table__row">${this.headerTableCells}</div>`;
  }

  get headerTableCells() {
    return this.header
      .map(item => {
        return `<div class="sortable-table__cell" data-name="${item.id}">
                    <span>${item.title}</span>
                    ${this.headerTableSortingArrow}
                  </div>`;
      }).join('');
  }

  get headerTableSortingArrow() {
    return `<span class="sortable-table__sort-arrow">
                <span class="sort-arrow"></span>
              </span>`;
  }

  get tableBody() {
    return `<div data-element="body" class="sortable-table__body">${this.getTableBodyLinks(this.data)}</div>`;
  }

  getTableBodyLinks(data) {
    return data.map(item => {
      return `<a href="/products/${item.id}" class="sortable-table__row">${this.getBodyCells(item)}</a>`;
    }).join('');
  }

  getBodyCells(item) {
    const cells = this.header.map(({id, template}) => {
      return {
        id,
        template
      };
    });

    return cells.map(({id, template}) => {
      return template
        ? template(item[id])
        : `<div class="sortable-table__cell">${item[id]}</div>`;
    }).join('');
  }

  get fullTemplate() {
    return `<div class="sortable-table">
                ${this.tableHeader}
                ${this.tableBody}
              </div>`;
  }

  render() {
    const element = document.createElement('div');

    element.innerHTML = this.fullTemplate;

    this.element = element.firstElementChild;

    this.subElements = this.getSubElements(element);
  }

  getSubElements(element) {
    const elements = element.querySelectorAll('[data-element]');

    return [...elements].reduce((accum, subElement) => {
      accum[subElement.dataset.element] = subElement;

      return accum;
    }, {});
  }

  sort(field, order) {
    const sortedData = this.sortData(field, order);

    this.subElements.body.innerHTML = this.getTableBodyLinks(sortedData);
  }

  sortData(field, order) {
    const arr = [...this.data];
    const column = this.header.find(item => item.id === field);
    const {sortType, customSorting} = column;
    const direction = order === 'asc' ? 1 : -1;

    return arr.sort((a, b) => {
      switch (sortType) {
        case 'number':
          return direction * (a[field] - b[field]);
        case 'string':
          return direction * a[field].localeCompare(b[field], 'ru');
        case 'custom':
          return direction * customSorting(a, b);
        default:
          return direction * (a[field] - b[field]);
      }
    });

  }

  remove() {
    this.element.remove();
  }

  destroy() {
    this.remove();
    this.subElements = {};
  }
}

