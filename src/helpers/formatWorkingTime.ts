export interface WorkingTime {
  week: string,
  start: string,
  end: string,
  id: number
}

export const formatWorkingTime = (dates: string[], weekInglish: string[]): WorkingTime[] => {
  return dates.map((date: string, index) => {
    const start = date ? date.split('-')[0] : '-';
    const end = date ? date.split('-')[1] : '-';
    const time: WorkingTime = {
      end,
      start,
      week: weekInglish[index].toUpperCase(),
      id: index
    };

    return time
  })
}