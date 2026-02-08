export interface MultiverseStory {
    universe_id: string;
    world_name: string;
    title?: string;
    core_difference: string;
    one_line_summary: string;
    profile: {
        age: number;
        job: string;
        residence: string;
        routine: {
            morning: string;
            afternoon: string;
            night: string;
        };
        main_worry: string;
        self_description: string;
    };
    stats: {
        wealth: number;
        happiness: number;
        health: number;
        reputation: number;
        love: number;
    };
    timeline: {
        age: number;
        year: number;
        event: string;
    }[];
    moments: {
        title: string;
        description: string;
    }[];
    analysis: {
        gained: string[];
        lost: string[];
        envy_point: string;
        anxiety_point: string;
    };
    message_to_reality: string;
    teaser: string;
    full_story?: string;
}
