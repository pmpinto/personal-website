// import Isotope from 'isotope-layout'
// import InfiniteScroll from 'infinite-scroll'
// import imagesLoaded from 'imagesloaded'

// const classNames = {
//   GRID: 'photographer__photo-grid',
//   PHOTOS: 'photographer__photo-item',
//   FILLERS: 'photographer__photo-grid-filler',
//   FILLERS_VISIBLE: 'photographer__photo-grid-filler--is-visible',
//   FILTER_ACTIVE: 'photographer__filter-button--is-active',
//   FILTER_BUTTONS: 'photographer__filter-button',
//   EMPTY_STATE: 'photographer__empty',
//   EMPTY_HIDDEN: 'photographer__empty--is-hidden',
//   NEXT_PAGE: 'photographer__next-page',
//   NEXT_PAGE_WRAPPER: 'photographer__next-wrapper',
//   NEXT_PAGE_WRAPPER_HIDDEN: 'photographer__next-wrapper--is-hidden',
//   STATUS_CONTAINER: 'photographer__infinite-scroll-status',
// }

// const removeFillerElements = () => {
//   const fillers = document.querySelectorAll(`.${classNames.FILLERS}`)

//   fillers.forEach((node) => {
//     node.addEventListener('transitionend', () => {
//       node.remove()
//     }, { once: true })

//     node.classList.remove(classNames.FILLERS_VISIBLE)
//   })
// }

// const drawFillerElements = (gridMode) => {
//   const {
//     gutter, element, colYs, columnWidth,
//   } = gridMode
//   const tallest = [...colYs].sort((a, b) => b - a)[0]

//   colYs.forEach((col, index) => {
//     const hasSpace = col + gutter < tallest
//     const fillerSize = Math.abs(tallest - col - gutter)

//     if (hasSpace && fillerSize >= gutter) {
//       const fillerTopPosition = col
//       const fillerLeftPosition = columnWidth * index
//       const filler = document.createElement('li')

//       filler.classList.add(classNames.FILLERS)
//       filler.style = `
//         height: ${fillerSize}px;
//         top: ${fillerTopPosition}px;
//         left: ${fillerLeftPosition}px;
//       `

//       element.appendChild(filler)

//       window.setTimeout(() => {
//         filler.classList.add(classNames.FILLERS_VISIBLE)
//       }, 0)
//     }
//   })
// }

// export const buildIsotopeGrid = (selector, options = {}) => {
//   const isotopeGrid = new Isotope(selector, options)
//   window.setTimeout(() => {
//     // eslint-disable-next-line no-underscore-dangle
//     drawFillerElements(isotopeGrid._mode())
//   }, 1000)
//   return isotopeGrid
// }

// export const filterGridByCategory = (grid, activeCategories) => {
//   grid.arrange({
//     filter: (element) => {
//       const photoCategories = element.getAttribute('data-categories')

//       if (!activeCategories.length || !photoCategories) {
//         return '*'
//       }

//       const photoCategoriesArray = photoCategories.split(' ')

//       return activeCategories.every((category) => photoCategoriesArray.includes(category))
//     },
//   })
// }

// const onClickFilter = (event, isotopeGrid) => {
//   const { target } = event

//   removeFillerElements()

//   target.classList.toggle(classNames.FILTER_ACTIVE)

//   const activeFilters = document.querySelectorAll(`.${classNames.FILTER_ACTIVE}`)
//   const activeCategories = []

//   activeFilters.forEach((filter) => {
//     activeCategories.push(filter.dataset.category)
//   })

//   filterGridByCategory(isotopeGrid, activeCategories)
// }

// export const setupFilters = (isotopeGrid) => {
//   console.log('>', 'from filters', isotopeGrid)
//   const buttons = document.querySelectorAll(`.${classNames.FILTER_BUTTONS}`)

//   buttons.forEach((button) => {
//     button.addEventListener('click', (event) => onClickFilter(event, isotopeGrid))
//   })
// }

// export const setupEvents = (isotopeGrid) => {
//   console.log('>', 'from events', isotopeGrid)

//   isotopeGrid.on('arrangeComplete', (filteredItems) => {
//     document.querySelector(`.${classNames.EMPTY_STATE}`).classList.toggle(classNames.EMPTY_HIDDEN, filteredItems.length > 0)
//   })

//   isotopeGrid.on('layoutComplete', () => {
//     removeFillerElements()
//     // eslint-disable-next-line no-underscore-dangle
//     drawFillerElements(isotopeGrid._mode())
//   })
// }

// export const setupInfiniteScroll = (isotopeGrid) => {
//   document.querySelector(`.${classNames.NEXT_PAGE_WRAPPER}`).classList.add(classNames.NEXT_PAGE_WRAPPER_HIDDEN)
//   const infiniteScroll = new InfiniteScroll(`.${classNames.GRID}`, {
//     path: `.${classNames.NEXT_PAGE}`,
//     scrollThreshold: '10',
//     history: false,
//     status: `.${classNames.STATUS_CONTAINER}`,
//   })

//   infiniteScroll.on('load', (body) => {
//     const newPhotos = body.querySelectorAll(`.${classNames.PHOTOS}`)

//     imagesLoaded(newPhotos, () => {
//       isotopeGrid.insert(newPhotos)
//       isotopeGrid.layout()
//     })
//   })

//   return infiniteScroll
// }
