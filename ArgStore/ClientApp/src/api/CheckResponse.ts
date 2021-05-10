// Метод проверяющий ответы от сервера и формирующий сообщения об ошибках
const checkResponse = async (response: Response, place: string) => {
    console.log(await response);
    if (!response.ok) {
        const standardErrorName = response.status + " " + response.statusText;
        let log = `In ${place}: ${standardErrorName}. `;
        let message = standardErrorName;
        const body = await response.json();
        if (body.error) {
            log += `Error: ${body.error}`;
            message = body.error;
        }
        if (body.message) {
            message = body.message;
        }
        console.log(log);
        throw new Error(message);
    }
};

export default checkResponse;
