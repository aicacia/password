import RemoteStorage from 'remotestoragejs';

export const remoteStorage = new RemoteStorage();

remoteStorage.access.claim('*', 'rw');
remoteStorage.caching.enable('/');

remoteStorage.setApiKeys({
	dropbox: 'v21wdidfxjapm8b',
	googledrive: '399181883347-3dfijgbemptplmueu01bsfga9jpkks6j.apps.googleusercontent.com'
});
