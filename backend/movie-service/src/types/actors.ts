export interface Actor{
    actor_public_id:string,
    actor_name:string,
    actor_dob:Date,
    actor_country:string,
    actor_city:string
    actor_spouse:string|null,
}

export type ActorUpdate = {
    actor_name?: string | undefined
    actor_dob?: Date | undefined
    actor_country?: string | undefined
    actor_city?: string | undefined
    actor_spouse?: string | null | undefined
}
