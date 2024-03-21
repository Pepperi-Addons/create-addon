import '@pepperi-addons/cpi-node'

export async function load(configuration: any): Promise<void>{
    return Promise.resolve();
}

export const router = Router()
router.get('/test', (req, res) => {
    res.json({
        hello: 'World'
    })
})
