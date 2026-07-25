import React, { useState } from 'react';
import { Provider, useSelector, useDispatch } from 'react-redux';

// External Store aur Actions  import
import { store } from './app/store'; 
import { addStudent, updateStudent, deleteStudent } from './features/studentSlice';

function StudentManager() {
  const students = useSelector((state) => state.students);
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({ name: '', email: '', course: '' });
  const [editingId, setEditingId] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.course) return;

    if (editingId) {
      dispatch(updateStudent({ id: editingId, ...formData }));
      setEditingId(null);
    } else {
      dispatch(addStudent(formData));
    }

    setFormData({ name: '', email: '', course: '' });
  };

  const handleEdit = (student) => {
    setEditingId(student.id);
    setFormData({
      name: student.name,
      email: student.email,
      course: student.course,
    });
  };

  const handleCancel = () => {
    setEditingId(null);
    setFormData({ name: '', email: '', course: '' });
  };

  return (
    <div className="max-w-4xl mx-auto my-10 p-6 bg-white rounded-xl shadow-md border border-gray-100 font-sans flex flex-col justify-between">
      <div>
        <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Student Management System
        </h2>

        {/* Form */}
        <form onSubmit={handleSubmit} className="mb-8 p-4 bg-gray-50 rounded-lg border border-gray-200">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-4">
            <input
              type="text"
              name="name"
              placeholder="Student Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
            <input
              type="text"
              name="course"
              placeholder="Course"
              value={formData.course}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
              required
            />
          </div>

          <div className="flex gap-2">
            <button
              type="submit"
              className={`px-4 py-2 text-white text-sm font-medium rounded-md shadow-sm transition-colors ${
                editingId ? 'bg-amber-600 hover:bg-amber-700' : 'bg-blue-600 hover:bg-blue-700'
              }`}
            >
              {editingId ? 'Update Student' : 'Add Student'}
            </button>
            
            {editingId && (
              <button
                type="button"
                onClick={handleCancel}
                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white text-sm font-medium rounded-md shadow-sm transition-colors"
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {/* Table */}
        <div className="overflow-x-auto rounded-lg border border-gray-200">
          <table className="w-full text-left border-collapse text-sm text-gray-600">
            <thead>
              <tr className="bg-gray-100 text-gray-700 uppercase font-semibold text-xs border-b border-gray-200">
                <th className="py-3 px-4">Name</th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Course</th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {students.length === 0 ? (
                <tr>
                  <td colSpan="4" className="py-6 text-center text-gray-500">
                    No student records found.
                  </td>
                </tr>
              ) : (
                students.map((student) => (
                  <tr key={student.id} className="hover:bg-gray-50 transition-colors">
                    <td className="py-3 px-4 font-medium text-gray-900">{student.name}</td>
                    <td className="py-3 px-4">{student.email}</td>
                    <td className="py-3 px-4">{student.course}</td>
                    <td className="py-3 px-4 space-x-2">
                      <button
                        onClick={() => handleEdit(student)}
                        className="px-3 py-1 bg-amber-500 hover:bg-amber-600 text-white text-xs font-medium rounded shadow-sm transition-colors"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => dispatch(deleteStudent(student.id))}
                        className="px-3 py-1 bg-red-600 hover:bg-red-700 text-white text-xs font-medium rounded shadow-sm transition-colors"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <footer className="mt-8 pt-4 border-t border-gray-200 text-center">
        <p className="text-xs text-gray-500">
          © {new Date().getFullYear()} Designed & Developed by{' '}
          <span className="font-semibold text-gray-800">Ragani Kumari</span>. All rights reserved.
        </p>
      </footer>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <StudentManager />
    </Provider>
  );
}