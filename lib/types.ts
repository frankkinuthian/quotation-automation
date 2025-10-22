// QuotationItem type must be defined first as it's referenced in the Database type
export type QuotationItem = {
  product_id: string;
  quantity: number;
  unit_price: number;
  line_total: number;
};

export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          email: string | null;
          full_name: string | null;
          created_at: string;
        };
        Insert: {
          id: string;
          email?: string | null;
          full_name?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          email?: string | null;
          full_name?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
      products_vector: {
        Row: {
          id: string;
          item_number: string;
          item_description: string;
          currency: string;
          price: number;
          embedding: string | null;
          chunk_text: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          item_number: string;
          item_description: string;
          currency: string;
          price: number;
          embedding?: string | null;
          chunk_text: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          item_number?: string;
          item_description?: string;
          currency?: string;
          price?: number;
          embedding?: string | null;
          chunk_text?: string;
          created_at?: string;
        };
        Relationships: [];
      };
      quotations: {
        Row: {
          id: string;
          user_id: string;
          client_email: string;
          client_name: string | null;
          items: QuotationItem[] | null;
          subtotal: number | null;
          tax: number | null;
          total: number | null;
          currency: string;
          status: string;
          document_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          client_email: string;
          client_name?: string | null;
          items?: QuotationItem[] | null;
          subtotal?: number | null;
          tax?: number | null;
          total?: number | null;
          currency?: string;
          status?: string;
          document_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          client_email?: string;
          client_name?: string | null;
          items?: QuotationItem[] | null;
          subtotal?: number | null;
          tax?: number | null;
          total?: number | null;
          currency?: string;
          status?: string;
          document_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Relationships: [];
      };
      emails: {
        Row: {
          id: string;
          user_id: string;
          message_id: string;
          from_email: string;
          subject: string | null;
          attachment_name: string | null;
          status: string;
          error_message: string | null;
          quotation_id: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          message_id: string;
          from_email: string;
          subject?: string | null;
          attachment_name?: string | null;
          status?: string;
          error_message?: string | null;
          quotation_id?: string | null;
          created_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          message_id?: string;
          from_email?: string;
          subject?: string | null;
          attachment_name?: string | null;
          status?: string;
          error_message?: string | null;
          quotation_id?: string | null;
          created_at?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

// Derived types from Database
export type Product = Database["public"]["Tables"]["products_vector"]["Row"];
export type Quotation = Database["public"]["Tables"]["quotations"]["Row"];
export type Email = Database["public"]["Tables"]["emails"]["Row"];
export type Profile = Database["public"]["Tables"]["profiles"]["Row"];

export type QuotationWithItems = Quotation & {
  items: QuotationItem[];
};

export type Currency = "KES" | "USD" | "EUR" | "GBP";
export type QuotationStatus = "draft" | "sent" | "accepted" | "rejected";
export type EmailStatus =
  | "received"
  | "processing"
  | "matched"
  | "completed"
  | "failed";
