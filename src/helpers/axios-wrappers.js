import axios from 'axios'

export const axiosWrappers = {
    postAxios,
    putAxios,
}

function postAxios(url, body) {
    return axios
        .post(url, body)
        .then((res) => {
            if (res.status === 200) {
                alert('Product successfully added to DB')
            } else Promise.reject()
        })
        .catch((err) => alert('Something went wrong'))
}

function putAxios(url, body) {
    return axios
        .put(url, body)
        .then((res) => {
            if (res.status === 200) {
                alert('Product successfully added to DB')
            } else Promise.reject()
        })
        .catch((err) => alert('Something went wrong'))
}
