import { ReactElement } from "react";
import { Triangle } from "react-loader-spinner";

export function MLoading(): ReactElement {
  return <div className="grid h-screen place-items-center">
    <Triangle
      height="120"
      width="120"
      color="#4fa94d"
      ariaLabel="triangle-loading"
      wrapperStyle={{}}
      visible={true}
    />
  </div>;
}