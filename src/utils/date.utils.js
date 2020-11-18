export const months = ['Јануар', 'Фебруар', 'Март', 'Април', 'Мај', 'Јун', 'Јул', 'Август', 'Септембар', 'Октобар', 'Новембар', 'Децембар']
export const monthsLowercase = ['јануар', 'фебруар', 'март', 'април', 'мај', 'јун', 'јул', 'август', 'септембар', 'октобар', 'новембар', 'децембар']
export const monthsLowercaseShort = ['јан.', 'феб.', 'мар.', 'апр.', 'мај', 'јун', 'јул', 'авг.', 'сеп.', 'окт.', 'нов.', 'дец.']

export const renderDate = (date) => {
  const [y, m, d] = date.split("-");
  return parseInt(d) + ". " + monthsLowercase[parseInt(m, 10) - 1] + " " + y;
};

const renderTimestampDateOptions = {
  showDay: true,
  showFullMonth: false,
}
export const renderTimestampDate = (date, options = renderTimestampDateOptions) => {
  const { showDay, showFullMonth } = options;
  const monthObj = showFullMonth ? monthsLowercase : showDay ? monthsLowercaseShort : months;
  const dateObj = new Date(date);
  const y = dateObj.getFullYear();
  const m = dateObj.getMonth() + 1;
  const d = showDay ? dateObj.getDate() + '.' : '';
  return d + " " + monthObj[parseInt(m, 10) - 1] + " " + y;
};