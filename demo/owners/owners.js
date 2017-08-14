// __log__/users/:workspaceId/:userId/:logId

module.exports = {
	'users': {
		path: (payload) => ` __log__/users/${payload.workspaceId}/${payload.userId}`
	},
	'workspaces': {
		path: (payload) => ` __log__/workspaces/${payload.workspaceId}`
	}
}
