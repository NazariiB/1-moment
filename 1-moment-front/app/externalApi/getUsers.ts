// types/user.ts
export interface User {
    object: string;
    fid: number;
    username: string;
    display_name: string;
    pfp_url: string;
    custody_address: string;
    profile: {
        bio: {
            text: string;
        };
    };
    follower_count: number;
    following_count: number;
    verifications: string[];
    verified_addresses: {
        eth_addresses: string[];
        sol_addresses: string[];
        primary: {
            eth_address: string;
            sol_address: string | null;
        };
    };
    verified_accounts: {
        platform: string;
        username: string;
    }[];
    power_badge: boolean;
}

export interface ApiResponse {
    users: User[];
}

export const getUserByName = async (username: string): Promise<User[]> => {
    if (!username.length) {
        return []
    }
    try {
        const response = await fetch(`https://api.neynar.com/v2/farcaster/user/search?q=${username}&limit=5`, {
            headers: {
                'x-api-key': 'NEYNAR_API_DOCS'
            }
        });

        if (!response.ok) {
            return []
        }

        const data = await response.json();

        return data.result.users
    } catch (err) {
        console.error('Error fetching users:', err);
        return []
    }
}