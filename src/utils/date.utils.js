export const months = ['Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун', 'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар']
export const shortMonths = ['Јан', 'Феб', 'Мар', 'Апр', 'Мај', 'Јун', 'Јул', 'Авг', 'Сеп', 'Окт', 'Нов', 'Дец']

export const renderDate = (date) => {
  const [y, m, d] = date.split("-");
  return d + " " + months[parseInt(m, 10) - 1] + " " + y;
};