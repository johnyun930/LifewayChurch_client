import { Bulleten } from "../components/Bulleten"

export const BulletenBoard = (): JSX.Element=>{
return(
    <Bulleten title={"자유게시판"} path={"/bulletenboard"} free={true} explaination={"자유롭게 소통하는 공간이니다"} img={"asdasd"}/>
)
}