export const devServer = "http://localhost:8080";

export const apiAuth = devServer + "";

export const apiPublic = devServer + "/api/public";

/**
 * 登录
 */
export const api_login = apiPublic + "/login";

/**
 * 获取用户信息
 */
export const api_getUserInfo = apiPublic + "/getUserInfo";

/**
 * 添加车位预约
 */
export const api_parking = apiAuth + "/parking";
