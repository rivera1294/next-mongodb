interface IFixedPositioning {
  first: {
    topRight: {
      desktop: {
        top: number
      }
      mobile: {
        top: number
      }
    }
  }
}

export const fixedPositioning: IFixedPositioning = {
  first: {
    topRight: {
      desktop: {
        top: 90,
      },
      mobile: {
        top: 65,
      },
    },
  },
}

const step: number = 35
export const getNthTop = (order: number) => {
  return {
    desktop: fixedPositioning.first.topRight.desktop.top + step * (order - 1),
    mobile: fixedPositioning.first.topRight.mobile.top + step * (order - 1),
  }
}
