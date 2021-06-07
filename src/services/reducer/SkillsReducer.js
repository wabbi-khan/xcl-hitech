import { SKILLS_FETCH_FAIL, SKILLS_FETCH_REQUEST, SKILLS_FETCH_SUCCESS } from "../constants/SkillsConst";


export const fetchSkillsReducer = (
    state = { skills: [] },
    action
) => {
    switch (action.type) {
        case SKILLS_FETCH_REQUEST:
            return { 
                loading: true,
            }
        case SKILLS_FETCH_SUCCESS:
            return { 
                loading: false,
                skills: action.payload
            }
        case SKILLS_FETCH_FAIL:
            return { 
                loading: false,
                error: action.payload
            }
    
        default:
            return state;
    }
}