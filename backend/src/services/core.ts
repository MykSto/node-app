import os from 'os'

const cores = os.cpus().length

const report = () => console.info('Available cores:', cores)

export default report
