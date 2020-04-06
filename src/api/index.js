import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/auth';
import 'firebase/firestore';

import { FirebaseConfig } from '../config/keys';
firebase.initializeApp(FirebaseConfig);

const db = firebase.firestore();
export const audioRef = db.collection('audios');
export const todosRef = db.collection('todos');

// 作品集合引用
export const worksRef = db.collection('works');
// 作者集合引用
export const authorsRef = db.collection('authors');
// 标签集合引用
export const tagsRef = db.collection('tags');

// 删除特定字段
export const deleteField = firebase.firestore.FieldValue.delete;

// 批量写入
export const batchWrite = db.batch;

// 存储引用
export const storageRef = firebase.storage().ref();
export const storage = firebase.storage;
