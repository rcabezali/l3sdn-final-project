export function Hooks() {
  const isFormValid = (form) => {
    if (!form) return { valid: false, error: 'No form received' }
    let valid = true
    let msg = ''
    let input
    Object.keys(form).forEach((index) => {
      const item = form[index]
      input = checkInputRequirement(item)
      if (input.error) {
        valid = false
        msg = input.msg
      }
    })
    return { valid: valid, error: msg }
  }

  function hashSHA512(input) {
    const hash = crypto.createHash('sha512')
    hash.update(input)
    return hash.digest('hex')
  }

  const checkInputRequirement = (item) => {
    const value = item.value || ''
    const required = item.required || false
    const email = item.email || false
    const input = {
      error: false,
      msg: ''
    }
    if (!value && required) {
      input.error = true
      input.msg = 'Tous les champs sont requis !'
    } else if (value && email && !isEmailValid(value)) {
      input.error = true
      input.msg = 'Veuillez specifier une email example: "' + value + "@gmail.com'"
    }
    return input
  }

  const isSubmitBtn = (form) => {
    let isValid = true
    Object.keys(form).forEach((index) => {
      const item = form[index]
      const value = item.value || ''
      const required = item.required || false
      const email = item.email || false
      if (!value && required) isValid = false
      else if (value && email && !isEmailValid(value)) isValid = false
    })
    return isValid
  }

  const isEmailValid = (value) =>
    /^([a-zA-Z0-9](.[a-zA-Z0-9._-]*[a-zA-Z0-9]))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )

  return {
    isFormValid,
    isSubmitBtn
  }
}
