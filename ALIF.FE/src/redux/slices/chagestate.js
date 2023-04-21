const initialState = {
  sidebarShow: true,
  asideShow: false,
  theme: 'dark',
  sidebarUnfoldable: false
}

const changeState = (state = initialState, { type, ...rest }) => {
  switch (type) {
    case 'set':
      return { ...state, ...rest }
    default:
      return state
  }
}

export default changeState
