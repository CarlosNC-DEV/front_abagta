export const formatDateToDDMMYYYY = (isoDate) => {
    if (!isoDate) return ''
    const [year, month, day] = isoDate.split('-')
    return `${day}/${month}/${year}`
  }

export const formatDateToISO = (ddmmyyyyDate) => {
    if (!ddmmyyyyDate) return ''
    const [day, month, year] = ddmmyyyyDate.split('/')
    return `${year}-${month}-${day}`
}