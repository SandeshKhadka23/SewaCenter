export const categories = [
    {
        id: 'electrical',
        name: 'Electrical',
        icon: 'Zap',
        description: 'Wiring, switchboards, appliance installation, electrical repair',
        providerCount: 18,
        image: 'https://images.pexels.com/photos/257736/pexels-photo-257736.jpeg?auto=compress&cs=tinysrgb&w=600',
        fixedServices: [
            { id: 'e1', name: 'Fan Installation', priceRange: 'Rs. 500–1000' },
            { id: 'e2', name: 'Switch Replacement', priceRange: 'Rs. 300–700' },
            { id: 'e3', name: 'Light Installation', priceRange: 'Rs. 400–800' }
        ],
        inspectionServices: [
            'Wiring fault', 'Short circuit', 'Power outage', 'Fuse problem'
        ]
    },
    {
        id: 'plumbing',
        name: 'Plumbing',
        icon: 'Droplets',
        description: 'Pipe repairs, leak fixing, drain cleaning, installation',
        providerCount: 24,
        image: 'https://images.pexels.com/photos/8961065/pexels-photo-8961065.jpeg?auto=compress&cs=tinysrgb&w=600',
        fixedServices: [
            { id: 'p1', name: 'Tap Replacement', priceRange: 'Rs. 300–600' },
            { id: 'p2', name: 'Washbasin Installation', priceRange: 'Rs. 800–1500' },
            { id: 'p3', name: 'Shower Repair', priceRange: 'Rs. 400–900' }
        ],
        inspectionServices: [
            'Water leakage', 'Blocked drain', 'Low water pressure', 'Motor issue'
        ]
    },
    {
        id: 'cleaning',
        name: 'Cleaning',
        icon: 'Sparkles',
        description: 'Home cleaning, deep cleaning, office cleaning, carpet cleaning',
        providerCount: 31,
        image: 'https://images.pexels.com/photos/4107112/pexels-photo-4107112.jpeg?auto=compress&cs=tinysrgb&w=600',
        fixedServices: [
            { id: 'c1', name: 'Sofa Cleaning', priceRange: 'Rs. 800–1200' },
            { id: 'c2', name: 'Bathroom Cleaning', priceRange: 'Rs. 600–1000' },
            { id: 'c3', name: 'Carpet Cleaning', priceRange: 'Rs. 1000–2000' }
        ],
        inspectionServices: [
            'Full house deep cleaning assessment', 'Pest control inspection', 'Post-construction cleaning'
        ]
    },
    {
        id: 'appliance-repair',
        name: 'Appliance Repair',
        icon: 'Settings',
        description: 'AC servicing, fridge repair, washing machine, TV repair',
        providerCount: 15,
        image: 'https://images.pexels.com/photos/4108715/pexels-photo-4108715.jpeg?auto=compress&cs=tinysrgb&w=600',
        fixedServices: [
            { id: 'a1', name: 'AC Servicing', priceRange: 'Rs. 1000–1500' },
            { id: 'a2', name: 'Washing Machine Installation', priceRange: 'Rs. 500–1000' },
            { id: 'a3', name: 'Water Purifier Filter Change', priceRange: 'Rs. 400–800' }
        ],
        inspectionServices: [
            'Fridge not cooling', 'Washing machine making noise', 'AC not turning on', 'Microwave heating issue'
        ]
    },
    {
        id: 'carpentry',
        name: 'Carpentry',
        icon: 'Hammer',
        description: 'Furniture repair, custom woodwork, door/window fitting',
        providerCount: 12,
        image: 'https://images.pexels.com/photos/5691622/pexels-photo-5691622.jpeg?auto=compress&cs=tinysrgb&w=600',
        fixedServices: [
            { id: 'ca1', name: 'Door Lock Installation', priceRange: 'Rs. 400–800' },
            { id: 'ca2', name: 'Hinge Replacement', priceRange: 'Rs. 200–500' },
            { id: 'ca3', name: 'Bed Assembly', priceRange: 'Rs. 600–1200' }
        ],
        inspectionServices: [
            'Custom furniture requirement', 'Squeaky wooden bed', 'Termite damaged wood repair'
        ]
    }
];
