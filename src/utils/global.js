export function global() {

    const localGlobal = {
        PORTAL: 'http://localhost:8080', // 前台
        ADMIN: 'http://localhost:8080', // 管理后台
        SERVER: 'http://localhost:8080', // 服务后台
        OSS_URL: 'http://localhost:8080' // 图片地址
    }

    const devGlobal = {
        PORTAL: 'http://localhost:8080', // 前台
        ADMIN: 'http://localhost:8080', // 管理后台
        SERVER: 'http://localhost:8081', // 服务后台
        OSS_URL: 'http://localhost:8081' // 图片地址
    }

    const prodGlobal = {
        PORTAL: 'http://localhost:8080', // 前台
        ADMIN: 'http://localhost:8080', // 管理后台
        SERVER: 'http://localhost:8081', // 服务后台
        OSS_URL: 'http://localhost:8081' // 图片地址
    }

    return localGlobal
}
