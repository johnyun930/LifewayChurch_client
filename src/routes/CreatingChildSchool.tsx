import { RouterProps } from "react-router-dom"
import { PostingForm } from "../components/PostingForm"
import { Input, SubmitButton, TextArea } from "./CreatingWorship"
import { Form, FormContainer } from "./CreatingWorship"

export const CreatingChildSchool = (): JSX.Element =>{
    return(
        <PostingForm IsbibleInput={true} path="childschool" ></PostingForm>
            )
}