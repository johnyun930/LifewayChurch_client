import { RouterProps } from "react-router-dom"
import { PostingForm } from "../components/PostingForm"
import { Input, SubmitButton, TextArea } from "./CreatingWorship"
import { Form, FormContainer } from "./CreatingWorship"

export const CreatingBibleStudy = (): JSX.Element =>{
    return(
        <PostingForm IsbibleInput={true} path="biblestudy" ></PostingForm>
            )
}