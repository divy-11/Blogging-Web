import { Form } from "../Components/Form"
import { Quote } from "../Components/Quote"

export const Signin = () => {
    return (<div className="grid grid-cols-1 lg:grid-cols-2">
        <div>
            <Form type="signin" />
        </div>
        <div className="hidden lg:block">
            <Quote />
        </div>
    </div>)
}