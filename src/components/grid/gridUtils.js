/* global _ */

export function sortBy(items, by, direction) {
  let newItems = Object.assign({}, items, {});
  newItems = items.sort((a, b) => {
    const aux = sortAlphaNum(a[by], b[by]);
    return direction === 'DESC' ? aux * -1 : aux;
  });
  return newItems;
}

function sortAlphaNum(a, b) {
  if (isNaN(a) && isNaN(b)) {
    return a.localeCompare(b);
  }
  return a > b ? 1 : -1;
}

export function computeTableStats(data) {
  const stats = {
    selected: data.reduce((n, val) => n + (val.__selected ? 1 : 0), 0),
    total: data.length,
  };

  const noneSelected = stats.selected === 0;
  stats.allSelected = stats.total > 0 && stats.selected === stats.total;
  stats.someButNotAllSelected = !stats.allSelected && !noneSelected;
  stats.anySelected = stats.selected > 0;
  stats.selectedItemName = stats.selected === 1 ? _.find(data, { __selected: true }).name : '';
  
  return stats;
}
