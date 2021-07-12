const itemTypes = {
	POSE: "posepack",
	OTHER: "other"
}

const locations = {
	WINDENBURG: "Windenburg",
	NEWCREST: "other"
}


const db = {
    'Bridgerton':  {
        'title' : 'Bridgerton Pose Pack',
        'type': itemTypes.POSE,
        'description': 'A mini pose pack',
        'requirement': {
            'title': '',
            'link':''
        },
        'downloadLink': '/packages/[MaddieDeluxe] Bridgerton Couples Pose Pack.package',
        'images': 4
    },
    'Telescope':  {
        'title' : 'Toddler & Adult Telescope Poses',
        'type': itemTypes.POSE,
        'description': '2 Poses designed for use with 1 adult and 1 toddler!',
        'requirement': {
            'title': 'Interactions from the past by <b> thepancake1 </b> for telescope.',
            'link':'https://www.patreon.com/posts/interactions-v5a-51448339?utm_medium=clipboard_copy&utm_source=copy_to_clipboard&utm_campaign=postshare'
        },
        'downloadLink': '/packages/[MaddieDeluxe] TelescopePosesWithToddler.package',
        'images': 2
    }
}

const storyPosts = [
    'https://www.instagram.com/p/CRA44sIDLuK/?utm_source=ig_embed&amp;utm_campaign=loading',
    'https://www.instagram.com/p/CRA44sIDLuK/?utm_source=ig_embed&amp;utm_campaign=loading'
];

const sims = {
    'Akira': {
        'name': 'Akira Kibo',
        'location': locations.WINDENBURG,
        'parents': '',
        'spouse': 'Karli'
    },
    'Karli': {
        'name': 'Karli Kibo',
        'location': locations.WINDENBURG,
        'parents': '',
        'spouse': 'Akira'
    },
    'Solomon': {
        'name': 'Solomon Kibo',
        'location': locations.WINDENBURG,
        'parents': {
            'mom': 'Karli',
            'dad': 'Akira'
        },
        'spouse': ''
    },
    'Esther': {
        'name': 'Esther Kibo',
        'location': locations.WINDENBURG,
        'parents': {
            'mom': 'Karli',
            'dad': 'Akira'
        },
        'spouse': ''
    },
    'Orren': {
        'name': 'Orren Kibo',
        'location': locations.WINDENBURG,
        'parents': {
            'mom': 'Karli',
            'dad': 'Akira'
        },
        'spouse': ''
    }
}