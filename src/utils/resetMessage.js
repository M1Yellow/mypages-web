/**
 * element-ui弹出多个message的问题处理
 * https://blog.csdn.net/weixin_36185028/article/details/106334946
 */

/**重置message，防止重复点击重复弹出message弹框 */
import {ElMessage} from 'element-plus';

let messageInstance = null;
const resetMessage = (options) => {
    if (messageInstance) {
        messageInstance.close()
    }
    messageInstance = ElMessage(options)
};
['error', 'success', 'info', 'warning'].forEach(type => {
    resetMessage[type] = options => {
        if (typeof options === 'string') {
            options = {
                message: options
            }
        }
        options.type = type
        return resetMessage(options)
    }
})
export const message = resetMessage
