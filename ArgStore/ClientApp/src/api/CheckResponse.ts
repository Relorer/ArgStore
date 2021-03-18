const checkResponse = async (response: Response, place: string) => {
    if (!response.ok) {
        const standardErrorName = response.status + " " + response.statusText;
        let log = `In ${place}: ${standardErrorName}. `;
        let message = standardErrorName;
        if (response.bodyUsed) {
            const body = await response.json();
            if (body.error) {
                log += `Error: ${body.error}`;
                message = body.error;
            }
        }
        console.log(log);
        throw new Error(message);
    }
};

export default checkResponse;
