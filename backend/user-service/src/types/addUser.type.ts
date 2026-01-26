export interface AddUser {
    user_public_id: string,
    user_fname: string,
    user_lname: string,
    user_email: string,
    user_country_code: string,
    user_phone: string,
    user_password: string,
    auth_app: string,
    user_role: "user" | "admin",
    user_status: "active" | "inactive"
}
