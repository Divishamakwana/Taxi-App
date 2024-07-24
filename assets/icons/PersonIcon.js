import * as React from "react"
import Svg, { Path } from "react-native-svg"
const PersonIcon = (props) => (
  <Svg
    xmlns="http://www.w3.org/2000/svg"
    width={13}
    height={15}
    fill="none"
    {...props}
  >
    <Path
      fill="#484849"
      d="M6.5 7.5a3.281 3.281 0 1 0 0-6.562 3.281 3.281 0 0 0 0 6.562Zm-3.984.938a1.64 1.64 0 0 0-1.641 1.64v.235c0 1.121.714 2.07 1.727 2.715 1.02.649 2.399 1.034 3.898 1.034 1.5 0 2.878-.385 3.898-1.034 1.013-.645 1.727-1.594 1.727-2.716v-.234a1.64 1.64 0 0 0-1.64-1.64h-7.97Z"
    />
  </Svg>
)
export default PersonIcon
