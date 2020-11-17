export const months = ['Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун', 'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар']
export const monthsLowercase = ['јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар']

export const renderDate = (date) => {
  const [y, m, d] = date.split("-");
  return parseInt(d) + ". " + monthsLowercase[parseInt(m, 10) - 1] + " " + y;
};

const renderTimestampDateOptions = {
  showDay: true,
}
export const renderTimestampDate = (date, options = renderTimestampDateOptions) => {
  const { showDay } = options;
  const monthObj = showDay ? monthsLowercase : months;
  const dateObj = new Date(date);
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth() + 1;
  const d = showDay ? dateObj.getDate() + '.' : '';
  return d + " " + monthObj[parseInt(m, 10) - 1] + " " + y;
};