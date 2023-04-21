import { CCol } from '@coreui/react-pro'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getSuppilerDetailsandExposures } from 'src/redux/async'
import Exposure from 'src/views/components/Exposure'


function ExposureBar() {
    const { supplierDetailsAndExposures_state } = useSelector(
        (state) => state.supplierDetailsAndExposures
      )
  const { shipperidstate } = useSelector((state) => state.shipperid)

  const dispatch = useDispatch()

    //   useEffect(() => {
    //     dispatch(
    //         getSuppilerDetailsandExposures({
    //           shipper_id: shipperidstate,
    //         }),
    //       )
    //   }, []);
    const convertData = (data) => {
        if (data) {
          let newdata = []
          for (let index = 0; index < data?.length; index++) {
            newdata.push({ ...data[index], score: Number(data[index]?.score) })
          }
          return newdata
        }
      }
  return (
    <>
    <CCol style={{ height: '300px' }}>
                <Exposure
                  chartID="Exposure"
                  data={convertData(supplierDetailsAndExposures_state)}
                />
              </CCol>
    </>
  )
}

export default ExposureBar