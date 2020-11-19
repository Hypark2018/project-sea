async function findMyNotifications(page, size) {
    const query = `
        query {
            findMyNotifications(page: ${page}, size: ${size}) {
                notifications {
                    createdTime
                    id
                    read
                    subject
                }
                page {
                    number
                    size
                    totalElements
                    totalPages
                }
            }
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }

    const notifications = response.data.findMyNotifications.notifications;

    if(notifications != null) {
        for(let i=0;i<notifications.length;i++) {
            const rid = notifications[i].id;
            const subject = notifications[i].subject;
            const isRead = notifications[i].read;
            const createdTime = notifications[i].createdTime;
        }
    }

    const pageInfo = response.data.findMyNotifications.page;
}

async function findNotification(id) {
    const query = `
        query {
            findNotification(id: ${id}) {
                content
                createdTime
                subject
            }
        }
    `

    const result = await fetch(path, request(query));

    const response = await result.json();
    if(response.errors != null) {
        console.log(response.errors[0]);
        return;
    }

    const notification = response.data.findNotification;

    const subject = notification.subject;
    const content = notification.content;
    const createdTime = notification.createdTime;
}

// findNotification(5);
// findMyNotifications(0, 10);

