import * as React from "react"
import Svg, { Path } from "react-native-svg"
const DownArrowIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={20}
    height={12}
    fill="none"
    {...props}
  >
    <Path
      stroke="#484849"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={4}
      d="M17.5 2.25 10 9.75l-7.5-7.5"
    />
  </Svg>
)
export default DownArrowIcon
