export const useAlert = () => {
    const [error, setError] = useState<string>();
    return {
        setError,
        renderAlert: () => {
            return <MyAlert 
                      visible={error !== undefined} 
                      body={error} onDismiss={() => setError(undefined)} />
        }
    }
}