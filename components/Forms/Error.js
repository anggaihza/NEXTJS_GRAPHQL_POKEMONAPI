const getErrorMessage = (type) => {
    console.log(type);
    switch (type) {
        case "minLength":
            return "Jumlah karakter tidak memenuhi minimum"
        case "validate":
            return "Format tidak sesuai"
        case "required":
        default:
            return "Mohon mengisi field"
    }
}

const FormError = ({ error }) => {
    if (!error) {
        return <></>
    }

    const { type } = error
    const message = getErrorMessage(type)

    return (
        <p className="text-red-600 text-xs">
            {message}
        </p>
    )
}

export default FormError