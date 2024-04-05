const getOrCreateTooltip = (chart) => {
  let tooltipEl = chart.canvas.parentNode.querySelector('div');

  if (!tooltipEl) {
    tooltipEl = document.createElement('div');
    tooltipEl.classList.add('chartjs-tooltip')

    const table = document.createElement('table');

    tooltipEl.appendChild(table);
    chart.canvas.parentNode.appendChild(tooltipEl);
  }

  return tooltipEl;
};

const externalTooltipHandler = (context) => {
  // Tooltip Element
  const {chart, tooltip} = context;
  const tooltipEl = getOrCreateTooltip(chart);

  // Hide if no tooltip
  if (tooltip.opacity === 0) {
    tooltipEl.style.opacity = 0;
    return;
  }

  // Set Text
  if (tooltip.body) {
    const titleLines = tooltip.title || [];
    const bodyLines = tooltip.body.map(b => b.lines);

    const tableHead = document.createElement('thead');

    titleLines.forEach(title => {
      const tr = document.createElement('tr');
      const th = document.createElement('th');
      if (tooltip.dataPoints[0].raw > 1500) {
        th.classList.add('warning')
        th.innerHTML = `
            <div style='display: flex; flex-direction: column;'>
            <span class='title'>Перебор</span>
            <span>Лишние ${tooltip.dataPoints[0].raw - 1500} ккал</span>
            <div>
        `
      } else {
        if(tooltip.dataPoints[0].raw == 1500) {
          th.classList.add('complete')
          th.innerHTML = `<span class='title'>Идеально</span>`
        } else {
          th.classList.add('warning')
          th.innerHTML = `
            <div style='display: flex; flex-direction: column;'>
            <span class='title'>Недостаточно</span>
            <span>Ещё ${1500 - tooltip.dataPoints[0].raw} ккал</span>
            </div>
        `
        }
      }
      tr.appendChild(th);
      tableHead.appendChild(tr);
    });

    const tableBody = document.createElement('tbody');
    bodyLines.forEach((body, i) => {
      const colors = tooltip.labelColors[i];
      //span.style.background = colors.backgroundColor;


      const tr = document.createElement('tr');

      const td = document.createElement('td');
      let text = document.createElement('p')
      text.innerHTML = body
      text.classList.add('text-s')
      td.appendChild(text);
      tr.appendChild(td);
      tableBody.appendChild(tr);
    });

    const tableRoot = tooltipEl.querySelector('table');

    // Remove old children
    while (tableRoot.firstChild) {
      tableRoot.firstChild.remove();
    }

    // Add new children
    tableRoot.appendChild(tableHead);
    tableRoot.appendChild(tableBody);
  }

  const {offsetLeft: positionX, offsetTop: positionY} = chart.canvas;

  // Display, position, and set styles for font
  tooltipEl.style.opacity = 1;
  tooltipEl.style.left = positionX + tooltip.caretX + 'px';
  tooltipEl.style.top = positionY + tooltip.caretY + 'px';
  tooltipEl.style.font = tooltip.options.bodyFont.string;
  tooltipEl.style.padding = tooltip.options.padding + 'px ' + tooltip.options.padding + 'px';
};

const ctx = document.getElementById('month-chart');
const data1 = [1500, 2001, 1000, 1500, 500, 1000, 2000, 1500, 2000, 1600, 1500, 1300, 1500, 2000, 1200, 1500, 1800, 1500]
const bgcolor1 = []
const bordercolor1 = []

for (let i=0; i<data1.length; i++) {
  if (data1[i]>1500 || data1[i]<1500) {
    bgcolor1.push('#FEEDED')
    bordercolor1.push('#EB5757')
  } else {
    bgcolor1.push('#27AE60')
    bordercolor1.push('#27AE60')
  }
}

new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ['1, пт', '2, сб', '3, вс', '4, пн', '5, вт', '6, ср', '7, чт', '8, пт', '9, сб', '10, вс', '11, пн', '12, вт', '13, ср', '14, чт', '15, пт', '16, сб', '17, вс', '18, пн'],
    datasets: [{
      label: 'Ккал',
      data: data1,
      backgroundColor: bgcolor1,
      borderColor: bordercolor1,
      borderWidth: 2,
      borderRadius: {
        topLeft: 20,
        topRight: 20
      },
      borderSkipped: false,
      min: 4000,
    }]
  },
  options: {
    hover: {mode: null},
    animation: {
      duration: 0
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: (context) => {
            if(context.tick.value == 1500) {
              return '#27AE60'
            } else {
              return '#F1F1F1'
            }
          }
        },
        ticks: {
          callback: function(value, index, ticks) {
            return value + ' ккал';
          },
          font: {
            family: "Manrope",
            size: 16,
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "Manrope",
            size: 16,
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler
      }
    }
  }
});


const ctx2 = document.getElementById('week-chart');
const data2 = [1500, 2200, 1500, 800, 1500, 1000, 2000]
const bgcolor2 = []
const bordercolor2 = []

for (let i=0; i<data2.length; i++) {
  if (data2[i]>1500 || data2[i]<1500) {
    bgcolor2.push('#FEEDED')
    bordercolor2.push('#EB5757')
  } else {
    bgcolor2.push('#27AE60')
    bordercolor2.push('#27AE60')
  }
}

new Chart(ctx2, {
  type: 'bar',
  data: {
    labels: ['1, пт', '2, сб', '3, вс', '4, пн', '5, вт', '6, ср', '7, чт'],
    datasets: [{
      label: 'Ккал',
      data: data2,
      backgroundColor: bgcolor2,
      borderColor: bordercolor2,
      borderWidth: 2,
      borderRadius: {
        topLeft: 20,
        topRight: 20
      },
      borderSkipped: false,
    }]
  },
  options: {
    hover: {mode: null},
    animation: {
      duration: 0
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: (context) => {
            if(context.tick.value == 1500) {
              return '#27AE60'
            } else {
              return '#F1F1F1'
            }
          }
        },
        ticks: {
          callback: function(value, index, ticks) {
            return value + ' ккал';
          },
          font: {
            family: "Manrope",
            size: 16,
          }
        }
      },
      x: {
        grid: {
          display: false
        },
        ticks: {
          font: {
            family: "Manrope",
            size: 16,
          }
        }
      }
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
        position: 'nearest',
        external: externalTooltipHandler
      }
    }
  }
});
