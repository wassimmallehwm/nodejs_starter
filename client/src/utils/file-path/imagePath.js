import config from '../../config/config';

export const userImage = (path) => {
    return `${config.publicUrl}images/users/${path}`
}