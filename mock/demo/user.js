const userList = {
    url: "/user/list",
    type: "get",
    response: () => {
        return {
            code: 20000,
            data: [
                {
                    "id": 1,
                    "username": "zhoujielun",
                    "password": "123456"
                },
                {
                    "id": 2,
                    "username": "guojingming",
                    "password": "666666"
                },
            ]
        }
    }
}

const userList1 = {
    url: "/user/list1",
    type: "get",
    response: () => {
        return {
            code: 20000,
            data: [
                {
                    "id": 1,
                    "username": "zhoujielun",
                    "password": "123456"
                },
                {
                    "id": 2,
                    "username": "guojingming",
                    "password": "666666"
                },
            ]
        }
    }
}

module.exports = [
    userList,
    userList1,
]
