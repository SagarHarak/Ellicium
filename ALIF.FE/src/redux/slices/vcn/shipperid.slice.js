import { createSlice, isAnyOf } from '@reduxjs/toolkit'

const initialState = {
    shipperidstate:'2105'
}

export const ShipperSlice = createSlice({
  name: 'ShipperId',
  initialState,
  reducers:{
    setShipperID(state,action){
        state.shipperidstate=action.payload
    }
  }
})
export const { setShipperID} = ShipperSlice.actions

export default ShipperSlice.reducer
