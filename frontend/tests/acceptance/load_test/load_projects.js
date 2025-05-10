export const config = {
    target: 'http://localhost:5173/projects',
    phases: [
        { duration: 60, arrivalRate: 150 } // projects page can handle 150 users/second
    ]
};
export const scenarios = [
    {
        flow: [
            { get: { url: '/' } } // Simulate a GET request to the homepage
        ]
    }
];
