import { TIMELINE_END_YEAR, TIMELINE_END_MONTH } from '../data/experiences';

export const getBasePixelsForMonth = (y, m) => {
  return (y >= 2025 || y <= 2022) ? 8 : 22;
};

export const getBasePositionForDate = (y, m) => {
  let px = 0;
  let currentY = TIMELINE_END_YEAR;
  let currentM = TIMELINE_END_MONTH;

  while (currentY > y || (currentY === y && currentM > m)) {
    px += getBasePixelsForMonth(currentY, currentM);
    currentM--;
    if (currentM === 0) {
      currentM = 12;
      currentY--;
    }
  }
  return px;
};

export const getPixelsForMonth = (y, m, experiences, hoveredExpId, hoveredExpStretch, staticStretches = {}) => {
  let px = getBasePixelsForMonth(y, m);

  if (experiences) {
    experiences.forEach(exp => {
      if (exp.endY === y && exp.endM === m && staticStretches[exp.id]) {
        px += staticStretches[exp.id];
      }
    });
  }

  if (hoveredExpId && hoveredExpStretch > 0 && experiences) {
    const hoveredExp = experiences.find(e => e.id === hoveredExpId);
    if (hoveredExp && hoveredExp.endY === y && hoveredExp.endM === m) {
      px += hoveredExpStretch;
    }
  }
  return px;
};

export const getPositionForDate = (y, m, experiences, hoveredExpId, hoveredExpStretch, staticStretches = {}) => {
  let px = 0;
  let currentY = TIMELINE_END_YEAR;
  let currentM = TIMELINE_END_MONTH;

  while (currentY > y || (currentY === y && currentM > m)) {
    px += getPixelsForMonth(currentY, currentM, experiences, hoveredExpId, hoveredExpStretch, staticStretches);
    currentM--;
    if (currentM === 0) {
      currentM = 12;
      currentY--;
    }
  }
  return px;
};
