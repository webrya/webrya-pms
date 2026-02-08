export type Language = 'en' | 'el';

export const translations = {
  en: {
    // Auth
    signIn: 'Sign In',
    signUp: 'Sign Up',
    email: 'Email',
    password: 'Password',
    fullName: 'Full Name',
    accountType: 'Account Type',
    createAccount: 'Create Account',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: "Don't have an account?",
    signingIn: 'Signing in...',
    creatingAccount: 'Creating account...',
    
    // Roles
    HOST_PRIVATE: 'Private Host',
    PM_COMPANY: 'Property Management Company',
    CLEANER: 'Cleaner',
    CLEANING_COMPANY: 'Cleaning Company',
    
    // Navigation
    dashboard: 'Dashboard',
    myTasks: 'My Tasks',
    properties: 'Properties',
    bookings: 'Bookings',
    tasks: 'Tasks',
    calendar: 'Calendar',
    settings: 'Settings',
    
    // Dashboard
    overview: 'Overview',
    totalProperties: 'Total Properties',
    activeBookings: 'Active Bookings',
    pendingTasks: 'Pending Tasks',
    completedTasks: 'Completed Tasks',
    bookingsTrend: 'Bookings Trend',
    taskStatus: 'Task Status',
    
    // Properties
    addProperty: 'Add Property',
    propertyName: 'Property Name',
    description: 'Description',
    address: 'Address',
    icalUrl: 'iCal URL',
    uploadImage: 'Upload Image',
    editProperty: 'Edit Property',
    deleteProperty: 'Delete Property',
    syncBookings: 'Sync Bookings',
    
    // Bookings
    checkIn: 'Check-in',
    checkOut: 'Check-out',
    nights: 'Nights',
    source: 'Source',
    
    // Tasks
    addTask: 'Add Task',
    taskTitle: 'Task Title',
    dueDate: 'Due Date',
    assignTo: 'Assign To',
    status: 'Status',
    notes: 'Notes',
    open: 'Open',
    in_progress: 'In Progress',
    completed: 'Completed',
    cleaningAfterCheckout: 'Cleaning after checkout',
    
    // Invites
    inviteUser: 'Invite User',
    inviteEmail: 'Invite Email',
    role: 'Role',
    sendInvite: 'Send Invite',
    CO_HOST: 'Co-Host',
    
    // Settings
    profile: 'Profile',
    security: 'Security',
    preferences: 'Preferences',
    language: 'Language',
    changePassword: 'Change Password',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    
    // Actions
    save: 'Save',
    cancel: 'Cancel',
    edit: 'Edit',
    delete: 'Delete',
    create: 'Create',
    update: 'Update',
    close: 'Close',
    
    // Messages
    success: 'Success',
    error: 'Error',
    loading: 'Loading...',
    noData: 'No data available',
    confirmDelete: 'Are you sure you want to delete this?',
    
    // Empty states
    noProperties: 'No properties yet. Add your first property to get started.',
    noBookings: 'No bookings yet.',
    noTasks: 'No tasks assigned to you.',
  },
  el: {
    // Auth
    signIn: 'Σύνδεση',
    signUp: 'Εγγραφή',
    email: 'Email',
    password: 'Κωδικός',
    fullName: 'Πλήρες Όνομα',
    accountType: 'Τύπος Λογαριασμού',
    createAccount: 'Δημιουργία Λογαριασμού',
    alreadyHaveAccount: 'Έχετε ήδη λογαριασμό;',
    dontHaveAccount: 'Δεν έχετε λογαριασμό;',
    signingIn: 'Σύνδεση...',
    creatingAccount: 'Δημιουργία λογαριασμού...',
    
    // Roles
    HOST_PRIVATE: 'Ιδιωτικός Οικοδεσπότης',
    PM_COMPANY: 'Εταιρεία Διαχείρισης Ακινήτων',
    CLEANER: 'Καθαριστής/Καθαρίστρια',
    CLEANING_COMPANY: 'Εταιρεία Καθαρισμού',
    
    // Navigation
    dashboard: 'Πίνακας Ελέγχου',
    myTasks: 'Οι Εργασίες Μου',
    properties: 'Ακίνητα',
    bookings: 'Κρατήσεις',
    tasks: 'Εργασίες',
    calendar: 'Ημερολόγιο',
    settings: 'Ρυθμίσεις',
    
    // Dashboard
    overview: 'Επισκόπηση',
    totalProperties: 'Σύνολο Ακινήτων',
    activeBookings: 'Ενεργές Κρατήσεις',
    pendingTasks: 'Εκκρεμείς Εργασίες',
    completedTasks: 'Ολοκληρωμένες Εργασίες',
    bookingsTrend: 'Τάση Κρατήσεων',
    taskStatus: 'Κατάσταση Εργασιών',
    
    // Properties
    addProperty: 'Προσθήκη Ακινήτου',
    propertyName: 'Όνομα Ακινήτου',
    description: 'Περιγραφή',
    address: 'Διεύθυνση',
    icalUrl: 'iCal URL',
    uploadImage: 'Ανέβασμα Εικόνας',
    editProperty: 'Επεξεργασία Ακινήτου',
    deleteProperty: 'Διαγραφή Ακινήτου',
    syncBookings: 'Συγχρονισμός Κρατήσεων',
    
    // Bookings
    checkIn: 'Άφιξη',
    checkOut: 'Αναχώρηση',
    nights: 'Διανυκτερεύσεις',
    source: 'Πηγή',
    
    // Tasks
    addTask: 'Προσθήκη Εργασίας',
    taskTitle: 'Τίτλος Εργασίας',
    dueDate: 'Ημερομηνία Λήξης',
    assignTo: 'Ανάθεση Σε',
    status: 'Κατάσταση',
    notes: 'Σημειώσεις',
    open: 'Ανοιχτό',
    in_progress: 'Σε Εξέλιξη',
    completed: 'Ολοκληρωμένο',
    cleaningAfterCheckout: 'Καθαρισμός μετά την αναχώρηση',
    
    // Invites
    inviteUser: 'Πρόσκληση Χρήστη',
    inviteEmail: 'Email Πρόσκλησης',
    role: 'Ρόλος',
    sendInvite: 'Αποστολή Πρόσκλησης',
    CO_HOST: 'Συν-Οικοδεσπότης',
    
    // Settings
    profile: 'Προφίλ',
    security: 'Ασφάλεια',
    preferences: 'Προτιμήσεις',
    language: 'Γλώσσα',
    changePassword: 'Αλλαγή Κωδικού',
    currentPassword: 'Τρέχων Κωδικός',
    newPassword: 'Νέος Κωδικός',
    confirmPassword: 'Επιβεβαίωση Κωδικού',
    
    // Actions
    save: 'Αποθήκευση',
    cancel: 'Ακύρωση',
    edit: 'Επεξεργασία',
    delete: 'Διαγραφή',
    create: 'Δημιουργία',
    update: 'Ενημέρωση',
    close: 'Κλείσιμο',
    
    // Messages
    success: 'Επιτυχία',
    error: 'Σφάλμα',
    loading: 'Φόρτωση...',
    noData: 'Δεν υπάρχουν διαθέσιμα δεδομένα',
    confirmDelete: 'Είστε σίγουροι ότι θέλετε να το διαγράψετε;',
    
    // Empty states
    noProperties: 'Δεν υπάρχουν ακόμα ακίνητα. Προσθέστε το πρώτο σας ακίνητο για να ξεκινήσετε.',
    noBookings: 'Δεν υπάρχουν ακόμα κρατήσεις.',
    noTasks: 'Δεν έχουν ανατεθεί εργασίες σε εσάς.',
  },
};

export function t(key: keyof typeof translations.en, lang: Language = 'en'): string {
  return translations[lang][key] || translations.en[key] || key;
}
